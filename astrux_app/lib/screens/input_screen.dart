import 'package:flutter/material.dart';
import '../widgets/zodiac_row.dart';
import 'result_screen.dart';

class InputScreen extends StatelessWidget {
  const InputScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 40),
            Image.asset('assets/images/astrux_logo.png', height: 130),
            const SizedBox(height: 20),
            const ZodiacRow(),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  TextField(
                      decoration: const InputDecoration(labelText: 'Date')),
                  TextField(
                      decoration: const InputDecoration(labelText: 'Time')),
                  TextField(
                      decoration: const InputDecoration(labelText: 'Latitude')),
                  TextField(
                      decoration:
                          const InputDecoration(labelText: 'Longitude')),
                  const SizedBox(height: 25),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => const ResultScreen()),
                      );
                    },
                    child: const Text("Generate Prediction"),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
