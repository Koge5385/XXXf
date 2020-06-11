#!/bin/bash

IAM_CREDENTIALS=mplat-iam-ec2

targetGroupName=$(aws --profile ${IAM_CREDENTIALS} deploy get-deployment --deployment-id $DEPLOYMENT_ID --query "deploymentInfo.loadBalancerInfo.targetGroupInfoList[*].name" --output text)
targetGroupArn=$(aws --profile ${IAM_CREDENTIALS} elbv2 describe-target-groups --names $targetGroupName --query "TargetGroups[*].TargetGroupArn" --output text)
autoscalingGroupName=$(aws --profile ${IAM_CREDENTIALS} deploy get-deployment --deployment-id $DEPLOYMENT_ID --query "deploymentInfo.targetInstances.autoScalingGroups" --output text)

if [ "$autoscalingGroupName" != "None" ]
then
  aws --profile ${IAM_CREDENTIALS} autoscaling attach-load-balancer-target-groups --auto-scaling-group-name "$autoscalingGroupName" --target-group-arns "$targetGroupArn"
fi
