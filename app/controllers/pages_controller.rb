class PagesController < ApplicationController
  def index
    
  end

  def show
    @parade = Parade.find(params[:id])
  end

  def update

  end

  def create

  end
end
