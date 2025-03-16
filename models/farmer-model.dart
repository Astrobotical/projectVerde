import 'user-model.dart';

class Farmer extends User {
  final Rating rating;
  final List<AvailableItem> availableItems;

  Farmer({
    required String id,
    required Name name,
    required String email,
    required Coordinates coordinates,
    double walletBalance = 0.0,
    this.rating = const Rating(raters: 0, totalRating: 0),
    this.availableItems = const [],
  }) : super(
          id: id,
          name: name,
          email: email,
          coordinates: coordinates,
          walletBalance: walletBalance,
        );

  factory Farmer.fromJson(Map<String, dynamic> json) {
    return Farmer(
      id: json['_id'],
      name: Name.fromJson(json['name']),
      email: json['email'],
      coordinates: Coordinates.fromJson(json['coordinates']),
      walletBalance: json['walletBalance']?.toDouble() ?? 0.0,
      rating: Rating.fromJson(json['rating'] ?? {}),
      availableItems: (json['availableItems'] as List<dynamic>?)
              ?.map((item) => AvailableItem.fromJson(item))
              .toList() ??
          [],
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return super.toJson()
      ..addAll({
        'rating': rating.toJson(),
        'availableItems': availableItems.map((item) => item.toJson()).toList(),
      });
  }
}

class Rating {
  final int raters;
  final int totalRating;

  const Rating({this.raters = 0, this.totalRating = 0});

  factory Rating.fromJson(Map<String, dynamic> json) {
    return Rating(
      raters: json['raters'] ?? 0,
      totalRating: json['totalRating'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'raters': raters,
      'totalRating': totalRating,
    };
  }
}

class AvailableItem {
  final String itemId;
  final double price;

  AvailableItem({required this.itemId, required this.price});

  factory AvailableItem.fromJson(Map<String, dynamic> json) {
    return AvailableItem(
      itemId: json['itemId'],
      price: json['price'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'itemId': itemId,
      'price': price,
    };
  }
}
