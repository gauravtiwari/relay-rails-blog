class Users::RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters

  respond_to :json, :html

  def new
    build_resource({})
    respond_with self.resource
  end

  def join_with_social
  end

  def create
    super
  end

  def edit
    super
  end

  def update
    @user = resource
    @registration = resource
    authorize @user
    @user.update_with_password(devise_parameter_sanitizer.sanitize(:account_update))
    if @user.encrypted_password_changed?
      set_flash_message :notice, :updated
      sign_in @user, :bypass => true
      render :edit
    else
      render "edit"
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me, :password_confirmation) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :terms_accepted, :username, :email, :password, :password_confirmation, :current_password) }
  end

end
