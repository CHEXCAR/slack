import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { WebClient } from '@slack/web-api';
import { DateTime } from 'luxon';
import { IncomingWebhook } from '@slack/webhook';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  private slackToken = process.env.SLACK_TOKEN;
  private slackClient: WebClient;

  constructor(private readonly appService: AppService) {
    this.slackClient = new WebClient(this.slackToken);
    this.test();
  }

  @Cron('0 0 9 * * 1-5')
  async sendDaily() {
    const weekdayKoreanMapper = {
      [1]: '월',
      [2]: '화',
      [3]: '수',
      [4]: '목',
      [5]: '금',
      [6]: '토',
      [7]: '일',
    };
    // await this.slackClient.chat.postMessage({
    //   channel: 'C07FDNZU0DP', // #체카랩_데일리
    //   text: '체카랩_데일리',
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: `:rocket: BASE 데일리_${DateTime.now().toFormat('yyyy_MM_dd')}(${weekdayKoreanMapper[DateTime.now().weekday]})`,
    //       },
    //     },
    //     {
    //       type: 'divider',
    //     }
    //   ],
    // });
    // await this.slackClient.chat.postMessage({
    //   channel: 'C07FDNZU0DP', // #체카랩_데일리
    //   text: '체카랩_데일리',
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: `:rocket: MARKET 데일리_${DateTime.now().toFormat('yyyy_MM_dd')}(${weekdayKoreanMapper[DateTime.now().weekday]})`,
    //       },
    //     },
    //     {
    //       type: 'divider',
    //     }
    //   ],
    // });
    // await this.slackClient.chat.postMessage({
    //   channel: 'C07FDNZU0DP', // #체카랩_데일리
    //   text: '체카랩_데일리',
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: `:rocket: MOS 데일리_${DateTime.now().toFormat('yyyy_MM_dd')}(${weekdayKoreanMapper[DateTime.now().weekday]})`,
    //       },
    //     },
    //     {
    //       type: 'divider',
    //     }
    //   ],
    // });
  }

  async test() {
    const weekdayKoreanMapper = {
      [1]: '월',
      [2]: '화',
      [3]: '수',
      [4]: '목',
      [5]: '금',
      [6]: '토',
      [7]: '일',
    };
    const webhook = new IncomingWebhook(
      'https://hooks.slack.com/services/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',
    );
    await webhook.send({
      text: '체카랩_데일리',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:rocket: MOS 데일리_${DateTime.now().toFormat('yyyy_MM_dd')}(${weekdayKoreanMapper[DateTime.now().weekday]})`,
          },
        },
        {
          type: 'divider',
        },
      ],
    });
  }
}
