import 'dotenv/config';
import * as Joi from 'joi';

const schema = Joi.object({
  DATABASE_URL: Joi.string().default(
    'postgresql://postgres:postgres@localhost:5432/bible_drizzle_db',
  ),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  ADDRESS: Joi.string().ip().default('0.0.0.0'),
  CORS_ORIGIN_REGEXP: Joi.string().default('^http://localhost:\\d+$'),
}).unknown();

const { value, error } = schema.validate(process.env, {
  abortEarly: false,
}) as {
  value: Record<string, string | number>;
  error?: Joi.ValidationError;
};

if (error) {
  throw new Error(
    `Config validation failed:\n${error.details.map((d) => d.message).join('\n')}`,
  );
}

export const config = {
  database: { url: value.DATABASE_URL as string },
  server: {
    port: value.PORT as number,
    address: value.ADDRESS as string,
    nodeEnv: value.NODE_ENV as 'development' | 'production' | 'test',
    isProduction: value.NODE_ENV === 'production',
    apiPrefix: '/api' as const,
    corsOriginRegexp: new RegExp(value.CORS_ORIGIN_REGEXP as string),
  },
} as const;
