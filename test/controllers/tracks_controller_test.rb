require 'test_helper'

class TracksControllerTest < ActionController::TestCase
  setup do
    @track = tracks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tracks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create track" do
    assert_difference('Track.count') do
      post :create, track: { album_id: @track.album_id, artist: @track.artist, cover_url: @track.cover_url, genre: @track.genre, iTunes_id: @track.iTunes_id, number: @track.number, preview_url: @track.preview_url, title: @track.title }
    end

    assert_redirected_to track_path(assigns(:track))
  end

  test "should show track" do
    get :show, id: @track
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @track
    assert_response :success
  end

  test "should update track" do
    patch :update, id: @track, track: { album_id: @track.album_id, artist: @track.artist, cover_url: @track.cover_url, genre: @track.genre, iTunes_id: @track.iTunes_id, number: @track.number, preview_url: @track.preview_url, title: @track.title }
    assert_redirected_to track_path(assigns(:track))
  end

  test "should destroy track" do
    assert_difference('Track.count', -1) do
      delete :destroy, id: @track
    end

    assert_redirected_to tracks_path
  end
end