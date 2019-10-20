import chalk from 'chalk';
import commander from 'commander';
import inquirer from 'inquirer';
import figlet from 'figlet';
import {
    getArchitecture,
    getOS,
    getPlatform,
    is32bit,
    is64bit,
    isLinux,
    isOSX,
    isSupportedOS,
    isWindows
} from "./utils/system";
import {COMMANDS_LIST} from "./constants/commands";

const currentPlatform = getPlatform();
const currentArchitecture = getArchitecture();
const currentOS = getOS();
const typesList = typeInFunctionOfPlatform(currentPlatform);

function typeInFunctionOfPlatform(platform) {
    if (platform === 'win32') {
        return ['package', 'nsis', 'portable']
    } else if (platform === 'linux') {
        return ['package', 'deb', 'AppImage', 'snap']
    } else if (platform === 'darwin') {
        return ['package', 'dmg', 'pkg']
    } else {
        return []
    }
}

function parseArgumentsIntoOptions(rawArgs) {
    const program = new commander.Command();
    program
        .version(
            chalk.cyan(`Version: ${require('../package').version}\n`),
            '-v, --version',
            'Output the CLI version number'
        )
        .helpOption('-h, --help', 'Output usage information')
        .arguments('<targetUrl> [destination]')
        .action((targetUrl, appDir) => {
            program.targetUrl = targetUrl;
            program.out = appDir;
        });
    for (const op of COMMANDS_LIST) {
        program.option(op.flags, op.description);
    }

    program.parse(rawArgs);
    if (!rawArgs.slice(2).length) {
        program.help();
    }

    if (!program.out) {
        program.out = process.cwd();
    }

    const args = program.opts();
    return {
        out: program.out,
        url: program.targetUrl,
        name: args['appName'],
        icon: args['icon'],
        maximize: args['maximize'] || true,
        tray: args['tray'] || true,
        devTools: args['devTools'] || false,
        platform: args['platform'],
        architecture: args['architecture'],
        type: args['type'],
        fastQuit: args['fastQuit'] || false,
        fullscreen: args['fullscreen'] || false,
        showMenubar: args['showMenubar'] || false,
        singleInstance: args['singleInstance'] || true,
        clearCache: args['clearCache'] || false,
        insecure: args['insecure'] || false,
        hideWindowFrame: args['hideWindowFrame'] || false,
        counter: args['counter'] || false,
        bounce: args['bounce'] || false,
        disableContextMenu: args['disableContextMenu'] || false,
        userAgent: args['userAgent'] || '',
        version: args['appVersion'] || '1.0.0',
        copyright: args['appCopyright'] || `Copyright © ${new Date(Date.now()).getFullYear()}`,
        author: args['appAuthor'] || '',
        license: args['appLicense'] || 'MIT',
    };
}

async function promptForMissingOptions(options) {
    const questions = [];
    if (!options.name) {
        questions.push({
            type: 'input',
            name: 'name',
            message: 'Application name',
            default: null,
            suffix: `\t [default : ${chalk.green('URL page title')}]`,
        });
    }
    if (!options.icon) {
        questions.push({
            type: 'input',
            name: 'icon',
            message: 'Application icon',
            default: null,
            suffix: `\t [default : ${chalk.green('Electron icon')}]`,
        });
    }
    if (!options.platform) {
        questions.push({
            type: 'list',
            name: 'platform',
            message: 'Platform ?',
            choices: ['win32', 'darwin', 'linux'],
            default: (isOSX() || !isLinux() || !isWindows()) ? currentPlatform : null,
            suffix: `\t [default : ${chalk.green('Current platform')}]`,
        });
    }
    if (!options.architecture) {
        questions.push({
            type: 'list',
            name: 'architecture',
            message: 'Architecture ?',
            choices: ['x64', 'ia32'],
            default: (is32bit() || is64bit()) ? currentArchitecture : null,
            suffix: `\t [default : ${chalk.green('Current architecture')}]`,
        });
    }
    if (!options.type) {
        questions.push({
            type: 'list',
            name: 'type',
            message: 'Application type (ex : portable, installer, package, ...)',
            choices: typesList,
            default: (typesList.length > 0) ? typesList[0] : 'package',
            suffix: `\t [default : ${chalk.green('package')}]`
        });
    }
    questions.push({
        type: 'input',
        name: 'size',
        message: 'Window size',
        default: '1280x800',
        suffix: `\t [default : ${chalk.green('1280x800')}]`,
    });
    questions.push({
        type: 'input',
        name: 'out',
        message: 'Output folder ?',
        default: options.out,
        suffix: `\t [default : ${chalk.green(options.out)}]`
    });

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        out: options.out,
        url: options.url,
        name: options.name || answers.name,
        icon: options.icon || answers.icon,
        size: answers.size,
        maximize: options.maximize,
        tray: options.tray || answers.tray,
        devTools: options.devTools,
        platform: options.platform || answers.platform,
        architecture: options.architecture || answers.architecture,
        type: options.type || answers.type,
        fastQuit: options.fastQuit,
        fullscreen: options.fullscreen,
        showMenubar: options.showMenubar,
        singleInstance: options.singleInstance,
        clearCache: options.clearCache,
        insecure: options.insecure,
        hideWindowFrame: options.hideWindowFrame,
        counter: options.counter,
        bounce: options.bounce,
        disableContextMenu: options.disableContextMenu,
        userAgent: options.userAgent,
        version: options.version,
        copyright: options.copyright,
        author: options.author,
        license: options.license
    };
}

async function promptWelcomeMessage() {
    console.log(chalk.blue(
        figlet.textSync('Native App CLI')
    ));

    console.log(chalk.cyan(`Detected OS : ${currentOS}\n`));

    if (!isSupportedOS()) {
        console.log(chalk.red('Error : OS not supported.\n'));
        console.log(chalk.magenta('Exit'));
        process.exit(1);
    }

    if (!isOSX()) {
        console.log(chalk.yellow('Warning : You cannot create a mac application on this OS. You need have a mac OS.\n'));
    }

    if (!isWindows()) {
        console.log(chalk.yellow('Warning : You cannot create a windows application on this OS. You need have a windows OS.\n'));
    }
}

export async function cli(args) {
    await promptWelcomeMessage();

    const options = await promptForMissingOptions(parseArgumentsIntoOptions(args));
    console.log(options);

    try {
        const hrstart = process.hrtime();
        // await tasks.run();
        const hrend = process.hrtime(hrstart);
        let tps = '';
        if (hrend[0] <= 0) {
            tps = `${(hrend[1] * 10e-6).toFixed(3)}ms`;
        } else {
            tps = `${(hrend[0] + (hrend[1] * 10e-9)).toFixed(3)}s`;
        }
        console.log(`${chalk.green.bold('DONE')} App created in ${chalk.cyan.bold(`± ${tps}`)}`);
    } catch (e) {
        console.log(`${chalk.red.bold('ERROR')} A issue is occurred during the app creation`);
    }
}