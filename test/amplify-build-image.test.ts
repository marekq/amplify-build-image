import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AmplifyBuildImage from '../lib/amplify-build-image-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AmplifyBuildImage.AmplifyBuildImageStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
