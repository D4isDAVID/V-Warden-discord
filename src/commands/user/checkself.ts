import { Colours } from '../../@types/Colours';
import { Command } from '../../structures/Command';
import sendEmbed from '../../utils/messages/sendEmbed';
import db from '../../utils/database';

export default new Command({
    name: 'checkself',
    description: 'Find out which blacklisted servers you were found in',
    run: async ({ interaction }) => {
        const imports = await db.getImports(interaction.user.id);

        if (imports.length <= 0) {
            return sendEmbed({
                ephemeral: true,
                interaction,
                embed: {
                    description: '`🟢` You have not been found in any servers',
                    color: Colours.GREEN,
                },
            });
        }

        const badServers: string[] = [];

        for (let i = 0, l = imports.length; i < l; ++i) {
            const x = imports[i];
            badServers.push(x.BadServer.name);
        }

        return sendEmbed({
            ephemeral: true,
            interaction,
            embed: {
                description: `\`🔴\` You were recently found in the following servers:\`\`\`${badServers.join( 
                    '\n'
                )}\`\`\`\n ⚠️ *This does not mean you are still a part of these servers. You could have been indexed while you were still in them at some point in the past. Warden does not actively track users in blacklisted servers.*`,
                color: Colours.RED,
            },
        });
    },
});
