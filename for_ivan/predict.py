from ultralytics import YOLO
import cv2
# Load a pretrained YOLOv8n model
model = YOLO('/home/karl/Documents/Liman/for_ivan/best.pt')
import numpy 
import os


def _put_bbox_on_image( image: numpy.ndarray, 
                        bbox: list, 
                        class_name: str, 
                        color = None) -> numpy.ndarray:
    if color is None:
        color = (0, 0, 255)
    print(bbox)
    image = cv2.rectangle(
        image, 
        (int(bbox[0]), int(bbox[1])), 
        (int(bbox[2]), int(bbox[3])), 
        color, 
        2) 
    font = cv2.FONT_HERSHEY_SIMPLEX 
    image = cv2.putText(image, 
                        class_name, 
                        (int(bbox[0]), int(bbox[1])-5),
                        font,  
                        1.5, 
                        color, 
                        1, 
                        cv2.LINE_AA) 
    return image


# Run inference on 'bus.jpg' with arguments
save_path = "/home/karl/Documents/Liman/defects/saved_good"
folder_path = "/home/karl/Documents/Liman/defects/images/"
for file_name in os.listdir(folder_path):
    file_path = os.path.join(folder_path, file_name)
    if os.path.isfile(file_path):
        img = cv2.imread(file_path)
        predictions = model.predict(img, conf=0.25, save=False)

        height, width, channels = img.shape
        print(img.shape)

        for r in predictions:
            boxes = r.boxes
            for box in boxes:
                
                b = box.xyxy[0].tolist()  # это найденная зона
                c = int(box.cls.item()) # это класс зоны в виде числа
                conf = round(box.conf.item(), 2)
                str_list = " ".join(str(e) for e in b)
                print(f"{c} {str_list}") 
                img = _put_bbox_on_image(
                                    img,                   
                                    list(b),
                                    f"defect, conf {conf}"
                                )

        cv2.imwrite(os.path.join(save_path, file_name), img)

#cv2.imshow("Test", img)

# waits for user to press any key
# (this is necessary to avoid Python kernel form crashing)
#cv2.waitKey(0)

# closing all open windows
#cv2.destroyAllWindows()
