"""recipe table removed

Revision ID: 668ea73c5587
Revises: 90c1c9df7d28
Create Date: 2023-09-18 16:03:20.423562

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '668ea73c5587'
down_revision = '90c1c9df7d28'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipe')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(length=100), nullable=False),
    sa.Column('instructions', sa.TEXT(), nullable=False),
    sa.Column('ingredients', sa.TEXT(), nullable=True),
    sa.Column('image_url', sa.VARCHAR(length=200), nullable=True),
    sa.Column('youtube_link', sa.VARCHAR(length=200), nullable=True),
    sa.Column('measure', sa.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
