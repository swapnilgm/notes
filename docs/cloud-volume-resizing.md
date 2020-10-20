# Cloud based volume resizing

<!-- toc -->

## Abstract
This documents captures the volume i.e. disk storage resizing feature on major cloud providers


||AWS-EBS|GCE-PD|Azure disks|Cinder|Alicloud|
|-|-|-|-|-|-|
|Resize supported from IaaS|yes|yes|yes|yes|yes|yes|
|Resize supported on k8s|yes|yes|yes|yes|?|
|Volume resize while attached to running instance|yes|yes|?|No|No|

## AWS-EBS

You can increase the volume size, change the volume type, or adjust the performance of your EBS volumes. __If your instance supports Elastic Volumes, you can do so without detaching the volume or restarting the instance.__ This allows you to continue using your application while changes take effect.

### Elastic Volumes are supported on the following instances:
- All [current-generation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#current-gen-instances) instances
- Previous-generation instance families C1, C3, CC2, CR1, G2, I2, M1, M3, and R3

### Monitoring
- When you modify an EBS volume, it goes through a sequence of states. The volume enters the modifying state, the optimizing state, and finally the completed state. At this point, the volume is ready to be further modified.
- Volume modification changes take effect as follows:
    - Size changes usually take a few seconds to complete and take effect after a volume is in the Optimizing state.

    - Performance (IOPS) changes can take from a few minutes to a few hours to complete and are dependent on the configuration change being made.

    - It may take up to 24 hours for a new configuration to take effect, and in some cases more, such as when the volume has not been fully initialized. Typically, a fully used 1-TiB volume takes about 6 hours to migrate to a new performance configuration.

### Limitation
- After provisioning over 32,000 IOPS on an existing io1 volume, you may need to do one of the following to see the full performance improvements:
    - Detach and attach the volume.
    - Restart the instance.
- Decreasing the size of an EBS volume is not supported. However, you can create a smaller volume and then migrate your data to it using an application-level tool such as rsync.
- :warning: While m3.medium instances fully support volume modification, m3.large, m3.xlarge, and m3.2xlarge instances might not support all volume modification features.

## GCE-PD
- You can resize disks at any time, regardless of whether the disk is attached to a running instance.
- After you resize your zonal persistent disk, you must configure the file system on the disk to use the additional disk space.

## Azure disk
- The new size should be greater than the existing disk size.
## Kubernetes volume resize
- Beta since kubernetes 1.11
- Edit the storage size in `PersitentVolumeClaim`.
- Required enabling the feature gate, `ExpandPersistentVolumes`, as well as the admission controller, `PersistentVolumeClaimResize`. By default enabled in 1.11+.
- Current support from AWS-EBS, GCE-PD, Azure Disk, Azure File, Glusterfs, Cinder, Portworx, and Ceph RBD.
- Enbale it by setting `allowVolumeExpansion` field to `true` in PVC configured StorageClass object.
- Block storage volume types such as GCE-PD, AWS-EBS, Azure Disk, Cinder, and Ceph RBD typically require a __file system expansion__ before the additional space of an expanded volume is usable by pods. Kubernetes takes care of this automatically whenever the __pod(s) referencing your volume are restarted__.
- Post volume resize, if the `PersistentVolumeClaim` has the status `FileSystemResizePending`, it is safe to recreate the pod using the `PersistentVolumeClaim`.

## Alicloud
 - Resize the data disks that are attached to an instance only when the instance is in the Running or Stopped status.
 - You must restart the instance in the ECS console to apply the changes. This action causes your instance to stop working and may cause your business to be interrupted, so please proceed with caution.

## References

- [AWS volumes modification](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-modify-volume.html)
- [GCE resize persistent disks](https://cloud.google.com/compute/docs/disks/add-persistent-disk#resize_pd)
- [Expand azure disk](https://docs.microsoft.com/en-gb/azure/virtual-machines/windows/expand-os-disk)
- [Resize cinder volume](https://docs.openstack.org/cinder/latest/cli/cli-manage-volumes.html#resize-a-volume)
- [Resize alicloud data disks](https://www.alibabacloud.com/help/doc-detail/25452.htm?spm=a2c63.p38356.879954.8.78ae534bhdbtGJ#concept-z11-xsh-ydb)
- [Kubernetes persistent volume resizing](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/)
