import 'food-model.dart';
import 'user-model.dart';

class Buyer extends User {
  final List<Food> favoriteFoods;

  Buyer({
    required String id,
    required Name name,
    required String email,
    double walletBalance = 0.0,
    this.favoriteFoods = const [],
    required Coordinates coordinates
  }) : super(
      id: id,
      name: name,
      email: email,
      walletBalance: walletBalance,
      coordinates: coordinates
  );

  factory Buyer.fromJson(Map<String, dynamic> json) {
    return Buyer(
      id: json['_id'],
      name: Name.fromJson(json['name']),
      email: json['email'],
      walletBalance: json['walletBalance']?.toDouble() ?? 0.0,
      favoriteFoods: (json['favoriteFoods'] as List<dynamic>?)
          ?.map((e) => Food.fromJson(e as Map<String, dynamic>))
          .toList() ??
          [],
      coordinates: Coordinates.fromJson(json['coordinates']),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return super.toJson()
      ..addAll({
        'favoriteFoods': favoriteFoods,
      });
  }
}