
from ultralytics import YOLO



import albumentations as A
from albumentations.pytorch import ToTensorV2
from yolov5.utils.dataloaders import LoadImagesAndLabels

# Define your augmentation pipeline
transform = A.Compose([
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.2),
    A.ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, rotate_limit=30, p=0.5),
    A.Blur(blur_limit=3, p=0.2),
    A.CLAHE(p=0.2),
    A.ColorJitter(p=0.2),
    A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
    ToTensorV2()
])

# Load your dataset with augmentation
dataset = LoadImagesAndLabels(
    path='/home/karl/Documents/Liman/data.yaml',
    img_size=640,
    batch_size=1,
    augment=True,  # Enable augmentation
    hyp=None,  # Hyperparameters
    rect=False,  # Rectangular training
    cache_images=False,
    single_cls=False,
    stride=32,
    pad=0.0,
    prefix='',
    transform=transform  # Apply the augmentation pipeline
)

path = "yolov8n.pt"
model = YOLO(path)
model.train(
    #data='/home/karl/Documents/Liman/data.yaml', 
    data=dataset, 
    epochs=500,
    batch=1,
    warmup_epochs=2.0,
    workers=1
)
model.val() 