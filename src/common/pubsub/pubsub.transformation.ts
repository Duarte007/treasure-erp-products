import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { JsonUtils } from '../utils/json.utils';
import { PubsubPostBody } from './interfaces/pubsub-post-body';
import { IPubSubDecoratorOptions } from './pubsub.decorator';

@Injectable()
export class PubSubTransformation
  implements PipeTransform<PubsubPostBody, any>
{
  constructor(private readonly options?: IPubSubDecoratorOptions) {}

  transform(pubsubPostBody: PubsubPostBody, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        const pubsubPostBodyClone = JsonUtils.cloneDeepObject(pubsubPostBody);
        const body = JSON.parse(
          Buffer.from(pubsubPostBodyClone.message.data, 'base64').toString(),
        );

        if (this.options?.parseToArray && !Array.isArray(body)) {
          pubsubPostBodyClone.message.data = [body];
        } else {
          pubsubPostBodyClone.message.data = body;
        }

        return pubsubPostBodyClone;
      }
    } catch (error) {
      throw new Error('BODY_PARSE_ERROR');
    }
  }
}
