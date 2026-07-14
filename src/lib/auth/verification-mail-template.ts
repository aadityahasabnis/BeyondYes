import { createTransport } from 'nodemailer';
import type { NodemailerConfig } from 'next-auth/providers/nodemailer';

type SendVerificationRequestParams = {
    identifier: string;
    url: string;
    expires: Date;
    provider: NodemailerConfig;
    token: string;
    request: Request;
};

export async function sendVerificationRequest({ identifier, url, provider }: SendVerificationRequestParams) {
    const transport = createTransport(provider.server);

    await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: 'Sign in to BeyondYes',

        html: `
      <h1>BeyondYes</h1>
      <p>Click below to sign in.</p>

      <a href="${url}">
        Continue
      </a>
    `,

        text: `Sign in to BeyondYes\n\n${url}`,
    });
}
