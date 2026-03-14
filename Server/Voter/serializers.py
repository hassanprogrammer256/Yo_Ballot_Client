from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import * 


class voterSerializer(ModelSerializer):
    class Meta:
        model  = Voter
        fields ="__all__"
        
class candidateSerializer(ModelSerializer):
    position = SerializerMethodField()
    
    def get_position(self,obj, *args,**kwargs):
        if obj.position:
            return obj.position.name
        else:
            return None    
    class Meta:
        model = Candidate
        fields = ['name','position']
        
class postSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
