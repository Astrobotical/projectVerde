import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import '../../models/user-model.dart';
import '../../views/user/profile.dart';
part 'user_profile_event.dart';
part 'user_profile_state.dart';

class UserProfileBloc extends Bloc<UserProfileEvent, UserProfileState> {
  UserProfileBloc() : super(ProfileLoading()) {
    on<UserProfileEvent>((event, emit) {
    });
    on<LoadProfile>((event, emit) async {
    await Future.delayed(const Duration(seconds: 2)); // Simulated delay
    emit(ProfileLoaded(
      buyer: Buyer(name: Name(firstName: 'John',lastName:'Snow'), id: "23412",walletBalance: 1000,coordinates:Coordinates(latitude: 1.0, longitude: 0.3) , email: 'Johnshow@gmail.com')
    ));
    });
    }
  }

