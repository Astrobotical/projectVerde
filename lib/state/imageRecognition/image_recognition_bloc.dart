import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

import '../../Services/awsRekognitionService.dart';

part 'image_recognition_event.dart';
part 'image_recognition_state.dart';

class ImageRecognitionBloc extends Bloc<ImageRecognitionEvent, ImageRecognitionState> {
  final AwsRekognitionService _rekognitionService;
  ImageRecognitionBloc(this._rekognitionService) : super(ImageRecognitionInitial()) {
    on<ImageRecognitionEvent>((event, emit) {
    });
    on<AnalyzeImage>((event, emit) async {
      emit(ImageLoading());
      try {
        String label = await _rekognitionService.analyzeImage(event.imageFile);
        emit(ImageAnalyzed(label));
      } catch (e) {
        emit(ImageError("Failed to process image"));
      }
    });
  }
  }
