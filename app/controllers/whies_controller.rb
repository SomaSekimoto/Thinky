class WhiesController < ApplicationController

  skip_before_action :authenticate_user_from_token!

  def index
    @whies = Why.where(share: true)

    # @count = @whies.pb_answers.count

    render json: @whies
    # render json: @count

  end

  def show
    @why = Why.find(params[:id])
    render json: @why
  end

  def post
    @why = Why.create(question: params[:why], genre_id: params[:genre], share: params[:share])
    render json: @why
  end

  def count
    @why = Why.find(params[:id])
    @count = @why.pb_answers.count 
    render json: @count

  end

  def update
    @why = Why.find(params[:id])
    @why.update(share: params[:share])
    render json: @why
  end
end
