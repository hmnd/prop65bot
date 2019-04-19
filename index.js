require('dotenv').config();
const Telegraf = require('telegraf');
const uuid = require('uuid/v5');

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

const UUID_NAMSEPACE = '782a3f37-a656-4d70-87c1-020a928bd24e';
const prop65 = msg => msg.concat(
  ' is known to the State of California to cause cancer, birth defects, or other reproductive harm.',
);

bot.on('inline_query', (ctx) => {
  const { query } = ctx.inlineQuery;
  const result = prop65(query);
  return ctx.answerInlineQuery(
    [
      {
        id: uuid(query, UUID_NAMSEPACE),
        type: 'article',
        title: 'Send Cancer',
        description: result,
        input_message_content: {
          message_text: result,
        },
      },
    ],
    {
      cache_time: 31557600,
    },
  );
});

bot.launch();
