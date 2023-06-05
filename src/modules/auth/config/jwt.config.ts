import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {

    useFactory: () => {

        return {

            secret: "$MySecret",

            signOptions: { expiresIn: '1d' },

        };
    },
};