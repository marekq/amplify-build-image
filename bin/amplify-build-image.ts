#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AmplifyBuildImageStack } from '../lib/amplify-build-image-stack';

const app = new cdk.App();
new AmplifyBuildImageStack(app, 'AmplifyBuildImageStack');
