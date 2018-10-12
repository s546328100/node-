#include <opencv/cv.h>
#include <opencv/highgui.h>
#include <string.h>
#include <iostream>
#include <fstream>
using namespace std;
using namespace cv;

char Book[] = " $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'.";

char Chang(int gray) {
    if(gray>240) return ' ';
    int unit = 255.0 / strlen(Book);
    return Book[int(gray / unit)];
    //return int(gray / unit)? '0':'1';
    //return rand()%2? '$':'%';
}

int main()
{
    char name[] = "timg.jpg";
    char name2[] = "timg.txt";
    IplImage *a = cvLoadImage(name,0);
    ofstream Txtout(name2);
    for (int i = 0; i < a->height; i++) {
        for (int j = 0; j < a->width; j++) {
            CvScalar s = cvGet2D(a, i, j);
            Txtout << Chang(s.val[0]);
            printf_s("%c",Chang(s.val[0]));
        }
        Txtout << endl;
        cout << endl;
    }
    Txtout.close();
    
    return 0;
}