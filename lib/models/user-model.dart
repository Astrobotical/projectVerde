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