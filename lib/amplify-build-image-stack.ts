import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { DockerImageName, ECRDeployment } from 'cdk-ecr-deployment';
import { AnyPrincipal } from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class AmplifyBuildImageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create docker image
    const amplifyDocker = new DockerImageAsset(this, 'amplifydocker', 
      {
        directory: path.join(__dirname, "../docker"),
        platform: Platform.LINUX_AMD64
      },
    );

    // Create ECR repository
    const privateECR = new Repository(this, 'amplifydockerpublic', {
      repositoryName: 'amplify_build_public',
      imageScanOnPush: true,
      removalPolicy: RemovalPolicy.DESTROY,
      lifecycleRules: [
        {
          maxImageCount: 3,
          rulePriority: 1,
          description: 'Delete old images'
        }
      ]
    });

    // Upload Docker Image to ECR
    new ECRDeployment(this, 'DeployMediawikiDockerImage', {
        src: new DockerImageName(amplifyDocker.imageUri),
        dest: new DockerImageName(privateECR.repositoryUri),
    });
    
    // Grant public read access to the repository
    privateECR.grantPull(new AnyPrincipal());

    // Print container image URI
    new CfnOutput(this, "Container URI", {
      value: privateECR.repositoryUri
    });
  }
}
