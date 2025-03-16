import 'user-model.dart';

class Buyer extends User {
  final List<String> favoriteFoods;

  Buyer({
    required String id,
    required Name name,
    required String email,
    double walletBalance = 0.0,
    this.favoriteFoods = const [],
  }) : super(
          id: id,
          name: name,
          email: email,

          walletBalance: walletBalance,
        );

  factory Buyer.fromJson(Map<String, dynamic> json) {
    return Buyer(
      id: json['_id'],
      name: Name.fromJson(json['name']),
      email: json['email'],
      coordinates: Coordinates.fromJson(json['coordinates']),
      walletBalance: json['walletBalance']?.toDouble() ?? 0.0,
      favoriteFoods: (json['favoriteFoods'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
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
