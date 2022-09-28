const { Client, GatewayIntentBits, Discord, REST, Routes } = require('discord.js');
const { channel } = require('node:diagnostics_channel');
const wait = require('node:timers/promises').setTimeout;
secret = require("./secret.js");
const commands = [
	{
		name: 'test',
		description: 'testing',
	},
];

const rest = new REST({ version :'10' }).setToken(secret.key);

(async () => {
	try {
		console.log('Started (/) commands.');

		await rest.put(Routes.applicationCommands(secret.CLIENT_ID), { body: commands });

		console.log('Reloaded');
	}catch (error) {
		console.error(error);
	}
})();

const client = new Client(
	{intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]}
);


client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async msg => {
	const guild = await client.guilds.fetch('838955470903312386');
	const channel = guild.channels.cache.get('1022776585008451625');
	const message = await channel.lastMessage;

	if(message.content === 'hello') {
		msg.reply('squawk');
		message.react('😄');
		console.log('got it');
	}else{
		console.log('nope');
		msg.react('😡');
	}
});

/*hmm>?
console.log(msg.author.id);
client.on('typingStart', (channel, user) => {
	console.log("hi");
})
*/

client.on('typingStart', (channel, user) => {
	console.log("hi");
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isChatInputCommand()) return;

	if(interaction.commandName === 'test') {
		interaction.reply('Was this a good squawk?');
		const message = await interaction.fetchReply();
		message.react('😄');
		message.channel.send("OKAY");
	}
});

client.login(secret.key);
