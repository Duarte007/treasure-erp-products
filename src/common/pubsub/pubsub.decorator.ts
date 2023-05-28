import { applyDecorators, UseGuards, UsePipes } from '@nestjs/common'
import { PubSubGuard } from './pubsub.guard'
import { PubSubTransformation } from './pubsub.transformation'

export interface IPubSubDecoratorOptions {
    parseToArray?: boolean
}

export const PubSub = (options?: IPubSubDecoratorOptions) => {
    return applyDecorators(UseGuards(PubSubGuard), UsePipes(new PubSubTransformation(options)))
}
