import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import '../../state/imageRecognition/image_recognition_bloc.dart';

class userImageViewer extends StatefulWidget {
  const userImageViewer({super.key});

  @override
  _UserImageViewerState createState() => _UserImageViewerState();
}

class _UserImageViewerState extends State<userImageViewer> {
  File? _capturedImage;

  @override
  void initState() {
    super.initState();
    _captureImage(); // Automatically open the camera on page load
  }

  void _captureImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        _capturedImage = File(pickedFile.path);
      });

      context.read<ImageRecognitionBloc>().add(AnalyzeImage(_capturedImage!));
    } else {
      context.read<ImageRecognitionBloc>().add(ImageErrorEvent("No image captured"));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Image Viewer")),
      body: BlocBuilder<ImageRecognitionBloc, ImageRecognitionState>(
        builder: (context, state) {
          if (state is ImageLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is ImageAnalyzed) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _capturedImage != null
                    ? Image.file(_capturedImage!) // Display captured image
                    : const SizedBox.shrink(),
                const SizedBox(height: 10),
                Text("Detected: ${state.label}", style: const TextStyle(fontSize: 20)),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _captureImage, // Retake photo
                  child: const Text("Retake Photo"),
                ),
              ],
            );
          } else if (state is ImageError) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error, size: 50, color: Colors.red),
                const SizedBox(height: 10),
                Text(state.error, style: const TextStyle(color: Colors.red, fontSize: 18)),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _captureImage, // Retry capturing
                  child: const Text("Retry"),
                ),
              ],
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
