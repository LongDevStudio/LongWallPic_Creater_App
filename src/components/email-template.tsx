import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          firstName,
                                                                      }) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);

interface RestPwdEmailTemplateProps {
    firstName: string;
    verificationCode: string;
}

export const RestPwdEmailTemplate: React.FC<Readonly<RestPwdEmailTemplateProps>> = ({
                                                                                        firstName,
                                                                                        verificationCode,
                                                                                    }) => (
    <div>
        <h1>Hello, {firstName}!</h1>
        <p>Here is your reset password verification code: {verificationCode}</p>
    </div>
)
