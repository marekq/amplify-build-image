#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { AmplifyBuildImageStack } from '../lib/amplify-build-image-stack';

const app = new App();
new AmplifyBuildImageStack(app, 'AmplifyBuildImageStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
