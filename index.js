require('dotenv').config();
const Telegraf = require('telegraf');
const uuid = require('uuid/v5');

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

const UUID_NAMSEPACE = '782a3f37-a656-4d70-87c1-020a928bd24e';

const auxVerbRe = /.*(be|am|are|is|was|were|being|been|can|could|dare|do|does|did|have|has|had|having|may|might|must|need|ought|shall|should|will|would)$/;

const prop65Str = ' known to the State of California to cause cancer, birth defects, or other reproductive harm.';

const capitalizeFirst = str => str
  .charAt(0)
  .toUpperCase()
  .concat(str.slice(1));

const prop65Format = (msg) => {
  const normMsg = capitalizeFirst(msg.trim());
  console.info(auxVerbRe.exec(normMsg));
  return normMsg.concat(auxVerbRe.exec(normMsg) ? '' : ' is', prop65Str);
};

bot.on('inline_query', (ctx) => {
  const { query } = ctx.inlineQuery;
  const result = prop65Format(query);
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
      cache_time: 0,
    },
  );
});

bot.launch();
