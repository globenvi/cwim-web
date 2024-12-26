"""Initial migration

Revision ID: 95aaa6bc3ccf
Revises: 
Create Date: 2024-12-26 07:06:31.973466

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95aaa6bc3ccf'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('availability', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('discount', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=False))
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               type_=sa.String(length=500),
               existing_nullable=False)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=50),
               existing_nullable=False)
        batch_op.alter_column('tags',
               existing_type=sa.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('images',
               existing_type=sa.TEXT(),
               type_=sa.String(length=500),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('images',
               existing_type=sa.String(length=500),
               type_=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('tags',
               existing_type=sa.String(length=200),
               type_=sa.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('category',
               existing_type=sa.String(length=50),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.String(length=500),
               type_=sa.TEXT(),
               existing_nullable=False)
        batch_op.drop_column('created_at')
        batch_op.drop_column('discount')
        batch_op.drop_column('availability')

    # ### end Alembic commands ###
