"""empty message

Revision ID: 4c2f01952271
Revises: cc93dc7fb17e
Create Date: 2023-06-20 21:56:31.060772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4c2f01952271'
down_revision = 'cc93dc7fb17e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('custom_recipe', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('instructions', sa.Text(), nullable=False))
        batch_op.add_column(sa.Column('ingredients', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('custom_recipe', schema=None) as batch_op:
        op.create_foreign_key(None, 'custom_recipe', 'users', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.drop_column('user_id')
        batch_op.drop_column('ingredients')
        batch_op.drop_column('instructions')
        batch_op.drop_column('title')

    # ### end Alembic commands ###
