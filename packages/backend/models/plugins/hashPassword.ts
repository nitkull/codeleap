import { User } from '@app/backend/models';
import { genSalt, hashPass } from '@app/backend/services/auth/helpers/password';
import { DocumentType } from '@typegoose/typegoose';
import { Developer } from 'models/admin/users';
import { Schema } from 'mongoose';

export function hashPassword(schema: Schema): void {
  const hash = async function(this: DocumentType<Developer>): Promise<void> {
    // if (this.passwordless) return;
    if (this.password && !/^\$2[ab]\$/.test(this.password)) {
      const pwdSalt = genSalt();
      this.password = hashPass(this.password, pwdSalt);
    }
  };

  schema.pre('save', hash);
  schema.pre('update', hash);
  (schema as any).pre('updateOne', { document: true, query: false }, hash);
}
