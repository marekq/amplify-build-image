import * as cdk from '@aws-cdk/core';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as path from 'path';
import { CfnOutput } from "@aws-cdk/core";
import * as iam from '@aws-cdk/aws-iam'

export class AmplifyBuildImageStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create docker image
    const amplifydocker = new DockerImageAsset(this, 'amplifydocker', 
      {
        directory: path.join(__dirname, "../docker"),
        repositoryName: 'amplifybuild'
      },
    );

    // create iam policy for all principals
    function policy(): iam.PolicyStatement {
      const policy = new iam.PolicyStatement()
      policy.addPrincipals(new iam.ServicePrincipal('*'))
      policy.addActions(
         "ecr:GetDownloadUrlForLayer",
         "ecr:BatchGetImage",
         "ecr:BatchCheckLayerAvailability"
      )
      return policy
    }

    // add iam policy to ecr
    amplifydocker.repository.addToResourcePolicy(policy())

    new CfnOutput(this, "ContainerURI", {
      value: amplifydocker.repository.repositoryArn
    });
  }
}
