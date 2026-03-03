#!/usr/bin/env node

/**
 * create-lets-go-app — CLI for generating Let's Go! sites
 *
 * This CLI asks 4 questions:
 * 1. Stack type (static or full-stack)
 * 2. Business type (restaurant, salon, fitness, professional)
 * 3. Design style (editorial, modern-minimal, bold, warm, classic, material)
 * 4. Business name
 *
 * Then generates a complete, production-ready site.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Questions
const questions = [
  {
    type: 'select',
    name: 'stack',
    message: 'What type of project do you want to create?',
    choices: [
      { title: 'Static Site (HTML/CSS/JS only)', value: 'static', description: 'Simple, no build tools' },
      { title: 'Full Stack (Vite + React + Supabase)', value: 'fullstack', description: 'Advanced features, booking, payments' }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'businessType',
    message: 'What type of business is this for?',
    choices: [
      { title: 'Restaurant / Café', value: 'restaurant' },
      { title: 'Salon / Barbershop', value: 'salon' },
      { title: 'Fitness / Gym', value: 'fitness' },
      { title: 'Professional Services', value: 'professional' }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'style',
    message: 'What design style do you want?',
    choices: [
      { title: 'Editorial (Monocle, Cereal magazine)', value: 'editorial' },
      { title: 'Modern Minimal (Linear, Stripe)', value: 'modern-minimal' },
      { title: 'Bold & Confident (Ghost, Optimised Lean)', value: 'bold' },
      { title: 'Warm & Approachable (Neighborhood shop)', value: 'warm' },
      { title: 'Classic Professional (Law firm, advisor)', value: 'classic' },
      { title: 'Material (Google product page)', value: 'material' },
      { title: 'Kinetic (Variable fonts, scroll-reactive)', value: 'kinetic' },
      { title: 'Glass (Apple Liquid Glass, translucent)', value: 'glass' },
      { title: 'Brutal (Neo-brutalism, harsh borders)', value: 'brutal' }
    ],
    initial: 0
  },
  {
    type: 'text',
    name: 'businessName',
    message: 'What is your business name?',
    initial: 'My Business',
    validate: value => value.length > 0 ? true : 'Business name is required'
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Project directory name?',
    initial: prev => prev.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    validate: value => {
      if (value.length === 0) return 'Project name is required';
      if (fs.existsSync(value)) return `Directory "${value}" already exists`;
      return true;
    }
  }
];

async function generateStaticSite(answers) {
  const { stack, businessType, style, businessName, projectName } = answers;

  const spinner = ora('Generating your site...').start();

  try {
    // Step 1: Create project directory
    spinner.text = 'Creating project directory...';
    fs.mkdirSync(projectName, { recursive: true });

    // Step 2: Copy base template
    spinner.text = 'Copying base template...';
    const templatesDir = path.join(__dirname, '..', 'templates', 'static', 'base');
    copyDirectory(templatesDir, projectName);

    // Step 3: Load and merge config
    spinner.text = `Loading ${businessType} configuration...`;
    const configPath = path.join(__dirname, '..', 'templates', 'static', 'configs', `${businessType}.json`);
    const baseDataPath = path.join(projectName, 'site-data.json');

    const baseData = JSON.parse(fs.readFileSync(baseDataPath, 'utf-8'));
    const businessConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    const mergedData = { ...baseData, ...businessConfig };
    mergedData.business.name = businessName;

    fs.writeFileSync(baseDataPath, JSON.stringify(mergedData, null, 2));

    // Step 4: Apply design style
    spinner.text = `Applying ${style} design style...`;
    const stylePath = path.join(__dirname, '..', 'templates', 'static', 'styles', `style-${style}.css`);
    const styleCSS = fs.readFileSync(stylePath, 'utf-8');

    // Append entire style file to styles.css
    const stylesPath = path.join(projectName, 'css', 'styles.css');
    fs.appendFileSync(stylesPath, '\n\n/* Style overrides - ' + style + ' */\n' + styleCSS);

    // Step 5: Update favicon
    spinner.text = 'Generating favicon...';
    const initial = businessName.charAt(0).toUpperCase();
    const faviconPath = path.join(projectName, 'favicon.svg');
    let favicon = fs.readFileSync(faviconPath, 'utf-8');
    favicon = favicon.replace('>B<', `>${initial}<`);
    fs.writeFileSync(faviconPath, favicon);

    // Step 6: Initialize git
    spinner.text = 'Initializing git repository...';
    const { execSync } = await import('child_process');
    execSync('git init', { cwd: projectName, stdio: 'ignore' });
    execSync('git add .', { cwd: projectName, stdio: 'ignore' });
    execSync('git commit -m "Initial commit: Let\'s Go! site for ' + businessName + '"', {
      cwd: projectName,
      stdio: 'ignore'
    });

    spinner.succeed(chalk.green('✓ Site generated successfully!'));

    // Success message
    console.log('');
    console.log(chalk.bold.cyan('Your site is ready!'));
    console.log('');
    console.log('Next steps:');
    console.log('');
    console.log(chalk.dim('  1.') + ' cd ' + chalk.cyan(projectName));
    console.log(chalk.dim('  2.') + ' npx serve');
    console.log(chalk.dim('  3.') + ' Open ' + chalk.cyan('http://localhost:3000'));
    console.log('');
    console.log('To customize:');
    console.log(chalk.dim('  •') + ' Edit ' + chalk.cyan('site-data.json') + ' for content');
    console.log(chalk.dim('  •') + ' Edit ' + chalk.cyan('css/variables.css') + ' for colors/fonts');
    console.log(chalk.dim('  •') + ' See ' + chalk.cyan('README.md') + ' for full documentation');
    console.log('');

  } catch (error) {
    spinner.fail(chalk.red('✗ Generation failed'));
    console.error('');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

async function generateFullStackSite(answers) {
  const { businessType, businessName, projectName } = answers;

  // Ask for Supabase credentials
  console.log('');
  console.log(chalk.bold('Supabase Configuration'));
  console.log(chalk.dim('Get these from: https://app.supabase.com → Your Project → Settings → API'));
  console.log('');

  const supabaseAnswers = await prompts([
    {
      type: 'text',
      name: 'supabaseUrl',
      message: 'Supabase Project URL:',
      validate: value => {
        if (!value) return 'Supabase URL is required';
        if (!value.startsWith('https://')) return 'URL must start with https://';
        if (!value.includes('.supabase.co')) return 'Invalid Supabase URL format';
        return true;
      }
    },
    {
      type: 'text',
      name: 'supabaseAnonKey',
      message: 'Supabase Anon Key (public):',
      validate: value => {
        if (!value) return 'Anon key is required';
        if (value.length < 100) return 'Key seems too short - make sure you copied the full key';
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'addStripe',
      message: 'Do you want to configure Stripe for payments?',
      initial: false
    }
  ]);

  if (!supabaseAnswers.supabaseUrl || !supabaseAnswers.supabaseAnonKey) {
    console.log('');
    console.log(chalk.red('Supabase credentials are required for full-stack setup.'));
    process.exit(1);
  }

  let stripeKey = '';
  if (supabaseAnswers.addStripe) {
    const stripeAnswer = await prompts({
      type: 'text',
      name: 'stripeKey',
      message: 'Stripe Publishable Key (starts with pk_):',
      validate: value => {
        if (!value) return true; // Optional
        if (!value.startsWith('pk_')) return 'Stripe key must start with pk_';
        return true;
      }
    });
    stripeKey = stripeAnswer.stripeKey || '';
  }

  const spinner = ora('Generating your full-stack site...').start();

  try {
    // Step 1: Create project directory
    spinner.text = 'Creating project directory...';
    fs.mkdirSync(projectName, { recursive: true });

    // Step 2: Copy full-stack template
    spinner.text = 'Copying full-stack template...';
    const templatesDir = path.join(__dirname, '..', 'templates', 'fullstack');
    copyDirectory(templatesDir, projectName);

    // Step 3: Update site.config.ts with business name
    spinner.text = 'Configuring site settings...';
    const siteConfigPath = path.join(projectName, 'src', 'config', 'site.config.ts');
    let siteConfig = fs.readFileSync(siteConfigPath, 'utf-8');
    siteConfig = siteConfig.replace("name: 'The Local Kitchen'", `name: '${businessName}'`);
    fs.writeFileSync(siteConfigPath, siteConfig);

    // Step 4: Update package.json name
    spinner.text = 'Updating package.json...';
    const packageJsonPath = path.join(projectName, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Step 5: Update index.html title
    spinner.text = 'Updating HTML title...';
    const indexHtmlPath = path.join(projectName, 'index.html');
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
    indexHtml = indexHtml.replace("Let's Go! Restaurant", businessName);
    fs.writeFileSync(indexHtmlPath, indexHtml);

    // Step 6: Update favicon
    spinner.text = 'Generating favicon...';
    const initial = businessName.charAt(0).toUpperCase();
    const faviconPath = path.join(projectName, 'public', 'favicon.svg');
    let favicon = fs.readFileSync(faviconPath, 'utf-8');
    favicon = favicon.replace('>L<', `>${initial}<`);
    fs.writeFileSync(faviconPath, favicon);

    // Step 7: Create .env.local with credentials
    spinner.text = 'Creating environment configuration...';
    const envPath = path.join(projectName, '.env.local');
    let envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseAnswers.supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseAnswers.supabaseAnonKey}
`;

    if (stripeKey) {
      envContent += `
# Stripe Configuration (optional)
VITE_STRIPE_PUBLISHABLE_KEY=${stripeKey}
`;
    }

    fs.writeFileSync(envPath, envContent);

    // Step 8: Initialize git
    spinner.text = 'Initializing git repository...';
    const { execSync } = await import('child_process');
    execSync('git init', { cwd: projectName, stdio: 'ignore' });
    execSync('git add .', { cwd: projectName, stdio: 'ignore' });
    execSync('git commit -m "Initial commit: Let\'s Go! full-stack site for ' + businessName + '"', {
      cwd: projectName,
      stdio: 'ignore'
    });

    spinner.succeed(chalk.green('✓ Full-stack site generated successfully!'));

    // Success message
    console.log('');
    console.log(chalk.bold.cyan('Your full-stack site is ready!'));
    console.log('');
    console.log(chalk.green('✓') + ' Supabase configured automatically');
    if (stripeKey) {
      console.log(chalk.green('✓') + ' Stripe configured');
    }
    console.log('');
    console.log('Next steps:');
    console.log('');
    console.log(chalk.dim('  1.') + ' cd ' + chalk.cyan(projectName));
    console.log(chalk.dim('  2.') + ' npm install');
    console.log(chalk.dim('  3.') + ' Link to Supabase: ' + chalk.cyan('supabase link --project-ref YOUR_REF'));
    console.log(chalk.dim('  4.') + ' Run migrations: ' + chalk.cyan('supabase db reset'));
    console.log(chalk.dim('  5.') + ' Start dev server: ' + chalk.cyan('npm run dev'));
    console.log('');
    console.log('To customize:');
    console.log(chalk.dim('  •') + ' Edit ' + chalk.cyan('src/config/site.config.ts') + ' for business info');
    console.log(chalk.dim('  •') + ' Edit ' + chalk.cyan('src/config/features.config.ts') + ' to enable/disable modules');
    console.log(chalk.dim('  •') + ' Edit ' + chalk.cyan('tailwind.config.ts') + ' for colors and design tokens');
    console.log(chalk.dim('  •') + ' Update ' + chalk.cyan('.env.local') + ' to change API keys');
    console.log(chalk.dim('  •') + ' See ' + chalk.cyan('README.md') + ' for full documentation');
    console.log('');

  } catch (error) {
    spinner.fail(chalk.red('✗ Generation failed'));
    console.error('');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  // Create destination directory
  fs.mkdirSync(dest, { recursive: true });

  // Read all files/folders in source
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  console.log('');
  console.log(chalk.bold.cyan("Let's Go!") + chalk.dim(' — Generate a production-ready website'));
  console.log('');

  const answers = await prompts(questions, {
    onCancel: () => {
      console.log('');
      console.log(chalk.yellow('Cancelled. No files were created.'));
      process.exit(0);
    }
  });

  // Validate all answers were provided
  if (!answers.stack || !answers.businessType || !answers.style || !answers.businessName || !answers.projectName) {
    console.log('');
    console.log(chalk.red('All questions must be answered.'));
    process.exit(1);
  }

  // Generate based on stack type
  if (answers.stack === 'static') {
    await generateStaticSite(answers);
  } else {
    await generateFullStackSite(answers);
  }
}

main();
