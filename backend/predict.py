from ultralytics import YOLO
import cv2
# Load a pretrained YOLOv8n model
model = YOLO('train20/weights/best.pt')
import numpy 
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
                        0.5, 
                        color, 
                        1, 
                        cv2.LINE_AA) 
    return image


# Run inference on 'bus.jpg' with arguments
path = "defects/images/Деталь №3 (св.ш. цепочка пор) copy.JPG"
img = cv2.imread(path)
predictions = model.predict(img, conf=0.25, save=False)

height, width, channels = img.shape
print(img.shape)

for r in predictions:
    boxes = r.boxes
    for box in boxes:
        
        b = box.xyxy[0].tolist()  # это найденная зона
        c = int(box.cls.item()) # это класс зоны в виде числа
        str_list = " ".join(str(e) for e in b)
        print(f"{c} {str_list}") 
        img = _put_bbox_on_image(
                            img,                   
                            list(b),
                            "defect"
                        )


cv2.imshow("Test", img)

# waits for user to press any key
# (this is necessary to avoid Python kernel form crashing)
cv2.waitKey(0)

# closing all open windows
cv2.destroyAllWindows()
