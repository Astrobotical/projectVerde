part of 'user_profile_bloc.dart';

@immutable
sealed class UserProfileState {}

final class UserProfileInitial extends UserProfileState {}

class ProfileLoading extends UserProfileState {}

class ProfileLoaded extends UserProfileState {
  Buyer buyer;

  ProfileLoaded({
    required this.buyer
  });
}

class ProfileError extends UserProfileState {}
