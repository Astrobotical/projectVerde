import 'farmer-model.dart';

class User {
  Name name;
  String id;
  Coordinates coordinates;
  double walletBalance;

  User(
      {required this.name,
      required this.id,
      required this.walletBalance,
      required this.coordinates});
}

class Name {
  String firstName, lastName;

  Name({required this.firstName, required this.lastName});
}
