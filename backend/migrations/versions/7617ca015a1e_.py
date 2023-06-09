"""empty message

Revision ID: 7617ca015a1e
Revises: 63e250cb71ca
Create Date: 2023-04-09 20:18:08.557164

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7617ca015a1e'
down_revision = '63e250cb71ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.alter_column('release_date',
               existing_type=sa.DATE(),
               type_=sa.Integer(),
               existing_nullable=False)

    with op.batch_alter_table('cover', schema=None) as batch_op:
        batch_op.alter_column('img',
               existing_type=mysql.MEDIUMBLOB(),
               type_=sa.LargeBinary(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cover', schema=None) as batch_op:
        batch_op.alter_column('img',
               existing_type=sa.LargeBinary(),
               type_=mysql.MEDIUMBLOB(),
               nullable=True)

    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.alter_column('release_date',
               existing_type=sa.Integer(),
               type_=sa.DATE(),
               existing_nullable=False)

    # ### end Alembic commands ###
