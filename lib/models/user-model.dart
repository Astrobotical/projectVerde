class User {
  final String id;
  final Name name;
  final String email;
  final Coordinates coordinates;
  final double walletBalance;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.coordinates,
    this.walletBalance = 0.0,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      name: Name.fromJson(json['name']),
      email: json['email'],
      coordinates: Coordinates.fromJson(json['coordinates']),
      walletBalance: json['walletBalance']?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name.toJson(),
      'email': email,
      'coordinates': coordinates.toJson(),
      'walletBalance': walletBalance,
    };
  }
}

class Name {
  final String firstName;
  final String lastName;

  Name({required this.firstName, required this.lastName});

  factory Name.fromJson(Map<String, dynamic> json) {
    return Name(
      firstName: json['firstName'],
      lastName: json['lastName'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
    };
  }
}

class Coordinates {
  final double latitude;
  final double longitude;

  Coordinates({required this.latitude, required this.longitude});

  factory Coordinates.fromJson(Map<String, dynamic> json) {
    return Coordinates(
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': latitude,
      'longitude': longitude,
    };
  }
}

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

class Buyer extends User {
  final List<String> favoriteFoods;

  Buyer({
    required String id,
    required Name name,
    required String email,
    required Coordinates coordinates,
    double walletBalance = 0.0,
    this.favoriteFoods = const [],
  }) : super(
          id: id,
          name: name,
          email: email,
          coordinates: coordinates,
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
