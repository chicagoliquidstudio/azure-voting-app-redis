"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var reporter = require('cucumber-html-reporter');
var filename = 'report.html';
if (process.env.HTML) {
    filename = process.env.HTML;
}
var customerJSON = JSON.parse(fs.readFileSync('features/report/customer-report.json', 'utf-8'));
var finalJSON = [];
finalJSON.push(customerJSON[0]);
fs.writeFileSync('features/report/combined-report.json', JSON.stringify(finalJSON));
var options = {
    theme: 'bootstrap',
    jsonFile: 'features/report/combined-report.json',
    output: "features/report/" + filename,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        Browser: 'Chrome',
        JenkinsLink: process.env.BUILDURL,
        BuildTag: process.env.BUILDTAG
    }
};
reporter.generate(options);
