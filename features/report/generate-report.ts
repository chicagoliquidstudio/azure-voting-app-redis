import * as fs from 'fs';

const reporter = require('cucumber-html-reporter');
let filename = 'report.html';

if (process.env.HTML) {
    filename = process.env.HTML;
}

// let crewJSON = JSON.parse(fs.readFileSync('features/report/crew-report.json', 'utf8'));
const customerJSON = JSON.parse(fs.readFileSync('features/report/customer-report.json', 'utf-8'));

const finalJSON = [];
// finalJSON.push(crewJSON[0]);
finalJSON.push(customerJSON[0]);
fs.writeFileSync('features/report/combined-report.json', JSON.stringify(finalJSON));

const options = {
    theme: 'bootstrap',
    jsonFile: 'features/report/combined-report.json',
    output: `features/report/${filename}`,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        Browser: 'Chrome',
        JenkinsLink: process.env.BUILDURL,
        BuildTag: process.env.BUILDTAG

    }
};

reporter.generate(options);
