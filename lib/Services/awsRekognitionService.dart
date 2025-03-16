// AWS Rekognition Service
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

class AwsRekognitionService {
  final String accessKey = "AKIAW3MD7IOMDQWZQLOQ ";
  final String secretKey = "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";
  final String region = "us-east-1";

  Future<String> analyzeImage(File imageFile) async {
    final uri = Uri.https("rekognition.$region.amazonaws.com", "/");
    final requestBody = jsonEncode({
      "Image": {
        "Bytes": base64Encode(await imageFile.readAsBytes()),
      },
      "MaxLabels": 5,
      "MinConfidence": 70.0
    });

    final response = await http.post(
      uri,
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "RekognitionService.DetectLabels",
        "Authorization": "AWS4-HMAC-SHA256 Credential=$accessKey, SignedHeaders=host;x-amz-date;x-amz-target, Signature=$secretKey"
      },
      body: requestBody,
    );
    if (response.statusCode == 200) {
      final labels = jsonDecode(response.body)["Labels"];
      return labels.isNotEmpty ? labels[0]["Name"] : "Unknown";
    } else {
      throw Exception("Failed to analyze image");
    }
  }
}
