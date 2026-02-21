import 'package:flutter/material.dart';

class ZodiacRow extends StatelessWidget {
  const ZodiacRow({super.key});

  @override
  Widget build(BuildContext context) {
    final signs = [
      'aries','taurus','gemini','cancer',
      'leo','virgo','libra','scorpio',
      'sagittarius','capricorn','aquarius','pisces'
    ];

    return SizedBox(
      height: 80,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: signs.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: AnimatedScale(
              scale: 1,
              duration: const Duration(milliseconds: 600),
              child: Image.asset(
                'assets/images/zodiac/${signs[index]}.png',
                width: 60,
              ),
            ),
          );
        },
      ),
    );
  }
}
