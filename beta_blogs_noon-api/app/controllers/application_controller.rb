# class ApplicationController < ActionController::API
#   def authenticate_request
#     header = request.headers["Authorization"]
#     header = header.split(" ").last if header

#     begin
#       decoded = JWT.decode(header, Rails.application.credentials.secret_key_base).first
#       @current_user = User.find(decoded["user_id"])
#     rescue JWT::ExpiredSignature
#       render json: { error: "Token has expired" }, status: :unauthorized
#     rescue JWT::DecodeError
#       render json: { error: "Unauthorized" }, status: :unauthorized
#     end
#   end
# end
class ApplicationController < ActionController::API
  def authenticate_request
    header = request.headers["Authorization"] || request.headers["HTTP_AUTHORIZATION"]
    Rails.logger.debug "🛂 Auth Header: #{header.inspect}"

    token = header.split(" ").last if header
    Rails.logger.debug "🔑 Token: #{token}"

    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base.to_s, true, { algorithm: "HS256" }).first
      Rails.logger.debug "📜 Decoded JWT: #{decoded.inspect}"

      @current_user = User.find(decoded["user_id"])
      Rails.logger.debug "🙋‍♂️ Current user: #{@current_user.inspect}"
    rescue JWT::ExpiredSignature
      Rails.logger.debug "⏰ Token expired"
      render json: { error: "Token has expired" }, status: :unauthorized
    rescue JWT::DecodeError => e
      Rails.logger.debug "❌ JWT Decode error: #{e.message}"
      render json: { error: "Unauthorized" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound => e
      Rails.logger.debug "❌ User not found: #{e.message}"
      render json: { error: "User not found" }, status: :unauthorized
    end
  end
end