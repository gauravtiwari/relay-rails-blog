class VotesController < ApplicationController

  before_action :authenticate_user, only: [:create, :destroy, :update]
  before_action :find_votable
  before_action :find_vote, only: [:destroy]

  # POST /votes
  def create

    if @votable.voted? current_user.id
      destroy
    else
      # Build a comment
      @vote = Vote.new(
        user: current_user,
        votable: @votable
      )

      respond_to do |format|
        if @vote.save
          # Render comment
          format.html do
            render partial: 'votes', locals: { votable: @votable }
          end

          format.json { render :show }
          # => Turbolinks appends the nodes in `comments_list`
        else
          # Render error
          format.html do
            render partial: 'votes',
              locals: { votable: @votable },
              status: unprocessable_entity
          end
          format.json {
            render json: @vote.errors,
            status: unprocessable_entity
          }
        end
      end
    end
  end

  # DELETE /votes/:id
  def destroy
    # Build a comment
    @vote = @votable.votes.where(user: current_user).first
    authorize @vote

    respond_to do |format|
      if @vote and @vote.destroy
        # Destroy comment
        format.html do
          render partial: 'votes', locals: { votable: @vote.votable }
        end
        format.json { render :show }
      else
        # Render error
        format.html do
          render partial: 'votes',
            locals: { votable: @votable },
            status: unprocessable_entity
        end
        format.json {
          render json: @vote.errors,
          status: unprocessable_entity
        }
      end
    end
  end

  private

  def find_votable
    render json: {
      url: request.referrer || root_path,
      message: 'You are not authorized to perform this action. Redirecting...',
    }, status: :unauthorized unless ['Comment', 'Post'].include? params[:votable_type]

    # Find votable
    @votable = params[:votable_type].constantize.find(params[:votable_id])
  end

end
