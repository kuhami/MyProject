const log4js = require('log4js');
const logger = log4js.getLogger('flowSaver');
const path = require('path');
appRequire('plugins/flowSaver/server');
appRequire('plugins/flowSaver/flow');
appRequire('plugins/flowSaver/generateFlow');
const cron = appRequire('init/cron');
const knex = appRequire('init/knex').knex;
const manager = appRequire('services/manager');
const moment = require('moment');
const minute = 1;
const time = minute * 60 * 1000;

let accountInfo = {};

const updateAccountInfo = async () => {
  const accounts = await knex('account_plugin').select().where({});
  accountInfo = {};
  accounts.forEach(account => {
    accountInfo[account.port] = account.id;
  });
  return;
};

const saveFlow = async () => {
  try {
    const servers = await knex('server').select(['id', 'name', 'host', 'port', 'password', 'shift']);
    await updateAccountInfo();
    const promises = [];
    const saveServerFlow = async server => {
      const lastestFlow = await knex('saveFlow').select(['time']).where({
        id: server.id,
      }).orderBy('time', 'desc').limit(1);
      if(lastestFlow.length === 0 || Date.now() - lastestFlow[0].time >= time) {
        const options = {
          clear: true,
        };
        let flow = await manager.send({
          command: 'flow',
          options,
        }, {
          host: server.host,
          port: server.port,
          password: server.password,
        });
        flow = flow.map(f => {
          return {
            id: server.id,
            accountId: accountInfo[f.port - server.shift] || 0,
            port: f.port,
            flow: f.sumFlow,
            time: Date.now(),
          };
        }).filter(f => {
          return f.flow > 0;
        });
        if(flow.length === 0) {
          return;
        }
        const insertPromises = [];
        for(let i = 0; i < Math.ceil(flow.length / 50); i++) {
          const insert = knex('saveFlow').insert(flow.slice(i * 50, i * 50 + 50));
          insertPromises.push(insert);
        }
        await Promise.all(insertPromises);
      }
    };
    servers.forEach(server => {
      promises.push(saveServerFlow(server));
    });
    await Promise.all(promises);
  } catch(err) {
    logger.error(err);
    return;
  }
};

cron.minute(() => {
  saveFlow();
}, 1);
