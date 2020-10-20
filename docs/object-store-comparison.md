# Cloud based object store comparison
<!-- toc -->
## Limitations comparison table

|Resource | AWS|ABS|Swift| GCS|Alicloud|
|-|-|-|-|-|-|
|bucket name length|3-63 char|resourcegrp 1-90char, storage-account 3-24char, container 3-63char|256 bytes|3-64 char, no goole prefix or mispell|3-63  char|
|object name|unlimited|1-1024|1024 bytes|1024|1023|
|buckets per account|default 100, on demand no limit| 250 storage account, no limit on bucket per account|-|-|30 buckets per region|
|Objects per bucket|unlimited| capacity limits 2 PB for US and Europe, 500 TB for all other regions per stoarge account|unlimited|unlimited from forum|unlimited|
|Object Read requests per bucket| autoscale|20000req/sec per storage account|-|5000 reads per second, autoscales as needed|10GBps|
|Objects Write request per bucket|autoscale|consider in above| - |1000 reads per second, autoscales as needed|10GBps|
|Max Object size|5 TB|4.75 TB|5 GB|5 TB| 5 GB, 48GB with multipart|
|Chunk size|5MB to 5 GB| up to 100 MiB|up to 5 GB|-|5GB|
|Max no. of Chunks|10,000| 50,000| 1,000| 32<sup>x</sup>|
|Writes per object||||once per second|
|Writes per bucket||20000 per second request per account||no limits|
|HTTP Compression| [No|(https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html) |[No](https://docs.microsoft.com/en-us/rest/api/storageservices/put-blob)| |[yes](https://cloud.google.com/storage/docs/transcoding)|


## Azure Blob Storage (ABS)

| Resource                                                                                                     | Limit                                                     |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Number of storage accounts per region per subscription                                                       | 2001                                                      |
| Max storage account capacity                                                                                 | 500 TiB2                                                  |
| Max number of blob containers, blobs, file shares, tables, queues, entities, or messages per storage account | No limit                                                  |
| Maximum request rate per storage account                                                                     | 20,000 requests per second2                               |
| Max ingress3 per storage account (US Regions)                                                                | 10 Gbps if RA-GRS/GRS enabled, 20 Gbps for LRS/ZRS4       |
| Max egress3 per storage account (US Regions)                                                                 | 20 Gbps if RA-GRS/GRS enabled, 30 Gbps for LRS/ZRS4       |
| Max ingress3 per storage account (Non-US regions)                                                            | 5 Gbps if RA-GRS/GRS enabled, 10 Gbps for LRS/ZRS4        |
| Max egress3 per storage account (Non-US regions)                                                             | 10 Gbps if RA-GRS/GRS enabled, 15 Gbps for LRS/ZRS4       |
| Max size of single blob container                                                                            | Same as max storage account capacity                      |
| Max number of blocks in a block blob or append blob                                                          | 50,000 blocks                                             |
| Max size of a block in a block blob                                                                          | 100 MiB                                                   |
| Max size of a block blob                                                                                     | 50,000 X 100 MiB (approx. 4.75 TiB)                       |
| Max size of a block in an append blob                                                                        | 4 MiB                                                     |
| Max size of an append blob                                                                                   | 50,000 x 4 MiB (approx. 195 GiB)                          |
| Max size of a page blob                                                                                      | 8 TiB                                                     |
| Max number of stored access policies per blob container                                                      | 5                                                         |
| Target throughput for single blob                                                                            | Up to 60 MiB per second, or up to 500 requests per second |

## AWS S3

|Item|	Specification|
|-|-|
|Maximum object size	|5 TB|
|Maximum number of parts per upload|	10,000|
|Part numbers	|1 to 10,000 (inclusive)|
|Part size|	5 MB to 5 GB, last part can be < 5 MB|
|Maximum number of parts returned for a list parts request|	1000|
|Maximum number of multipart uploads returned in a list multipart uploads request|	1000|


## References
1. GCS: <https://cloud.google.com/storage/quotas>
1. AWS: <https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html>
1. Azure ABS: <https://docs.microsoft.com/en-us/azure/storage/common/storage-scalability-targets?toc=%2fazure%2fstorage%2fblobs%2ftoc.json>
1. Openstack Swift: <https://docs.openstack.org/mitaka/config-reference/object-storage/features.html>
1. Alicloud OSS https://www.alibabacloud.com/help/doc-detail/54464.htm?spm=a2c63.p38356.b99.6.5f627d91oCAUf5